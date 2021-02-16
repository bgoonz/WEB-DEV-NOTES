import { Config } from "./config";
import { Utilities, CommandMode, CommandIndicator, ViewPort, Input, CANCEL_MSG } from '../../metago.lib';
import { ILineCharIndexes, DecorationModel, DecorationModelBuilder, SmartAdjustment, LineCharIndex } from "./decoration/decoration-model";
import { Decorator } from "./decoration";
import * as vscode from "vscode";

class Selection {
    static Empty = new Selection();
    text: string;
    startLine: number;
    lastLine: number;
}

enum JumpPosition { Before, After, Smart }

export class MetaJump {
    private config: Config;
    private decorationModelBuilder: DecorationModelBuilder = new DecorationModelBuilder();
    private decorator = new Decorator();
    private commandIndicator = new CommandIndicator();
    private isJumping: boolean = false;
    private commandMode: CommandMode;
    private targetChars = "";
    private currentCommand = ""

    constructor(context: vscode.ExtensionContext, config: Config) {
        let disposables: vscode.Disposable[] = [];
        this.config = config;
        disposables.push(vscode.commands.registerCommand('metaGo.metaJump.backspace', () => this.stepCancel()));

        disposables.push(vscode.commands.registerCommand('metaGo.gotoAfter', () => {
            this.doJump('metaGo.gotoAfter');
        }));

        disposables.push(vscode.commands.registerCommand('metaGo.gotoSmart', () => {
            this.doJump('metaGo.gotoSmart');

        }));

        disposables.push(vscode.commands.registerCommand('metaGo.gotoBefore', () => {
            this.doJump('metaGo.gotoBefore');
        }));

        disposables.push(vscode.commands.registerCommand('metaGo.addCursorAfter', () => {
            this.doJump('metaGo.addCursorAfter');
        }));

        disposables.push(vscode.commands.registerCommand('metaGo.addCursorSmart', () => {
            this.doJump('metaGo.addCursorSmart');

        }));

        disposables.push(vscode.commands.registerCommand('metaGo.addCursorBefore', () => {
            this.doJump('metaGo.addCursorBefore');
        }));

        disposables.push(vscode.commands.registerCommand('metaGo.gotoAfterActive', () => {
            this.doJump('metaGo.gotoAfterActive');
        }));

        disposables.push(vscode.commands.registerCommand('metaGo.gotoSmartActive', () => {
            this.doJump('metaGo.gotoSmartActive');

        }));

        disposables.push(vscode.commands.registerCommand('metaGo.gotoBeforeActive', () => {
            this.doJump('metaGo.gotoBeforeActive');
        }));

        disposables.push(vscode.commands.registerCommand('metaGo.selectSmart', () => {
            this.doJump('metaGo.selectSmart');
        }));

        disposables.push(vscode.commands.registerCommand('metaGo.selectBefore', () => {
            this.doJump('metaGo.selectBefore');
        }));

        disposables.push(vscode.commands.registerCommand('metaGo.selectAfter', () => {
            this.doJump('metaGo.selectAfter');
        }));

        disposables.push(vscode.commands.registerTextEditorCommand('metaGo.metaJump.deleteToSmart', () => {
            this.doJump('metaGo.metaJump.deleteToSmart');
        }));

        disposables.push(vscode.commands.registerTextEditorCommand('metaGo.metaJump.deleteToBefore', () => {
            this.doJump('metaGo.metaJump.deleteToBefore');
        }));
        disposables.push(vscode.commands.registerTextEditorCommand('metaGo.metaJump.deleteToAfter', () => {
            this.doJump('metaGo.metaJump.deleteToAfter');
        }));

        for (let i = 0; i < disposables.length; i++) {
            context.subscriptions.push(disposables[i]);
        }

        this.decorationModelBuilder.initialize(this.config);
        this.decorator.initialize(this.config);
    }

    doJump = (command: string, fromStart = true) => {
        if (fromStart) this.targetChars = '';

        this.currentCommand = command;
        switch (command) {
            case 'metaGo.gotoAfter':
                this.jumpTo(JumpPosition.After);
                break;
            case 'metaGo.gotoSmart':
                this.jumpTo(JumpPosition.Smart);
                break;
            case 'metaGo.gotoBefore':
                this.jumpTo(JumpPosition.Before);
                break;
            case 'metaGo.gotoAfterActive':
                this.jumpTo(JumpPosition.After, false, false);
                break;
            case 'metaGo.gotoSmartActive':
                this.jumpTo(JumpPosition.Smart, false, false);
                break;
            case 'metaGo.gotoBeforeActive':
                this.jumpTo(JumpPosition.Before, false, false);
                break;
            case 'metaGo.selectSmart':
                this.selectTo(JumpPosition.Smart);
                break;
            case 'metaGo.selectBefore':
                this.selectTo(JumpPosition.Before);
                break;
            case 'metaGo.selectAfter':
                this.selectTo(JumpPosition.After);
                break;
            case 'metaGo.addCursorSmart':
                this.jumpTo(JumpPosition.Smart, true, false);
                break;
            case 'metaGo.addCursorBefore':
                this.jumpTo(JumpPosition.Before, true, false);
                break;
            case 'metaGo.addCursorAfter':
                this.jumpTo(JumpPosition.After, true, false);
                break;
            case 'metaGo.metaJump.deleteToSmart':
                this.selectTo(JumpPosition.Smart, true);
                break;
            case 'metaGo.metaJump.deleteToBefore':
                this.selectTo(JumpPosition.Before, true);
                break;
            case 'metaGo.metaJump.deleteToAfter':
                this.selectTo(JumpPosition.After, true);
                break;
        }
    }

    stepCancel = () => {
        let len = this.targetChars.length
        if (len === 0) {
            this.cancel()
            vscode.commands.executeCommand('setContext', "metaGoJumping", false);
        } else {
            let target = this.targetChars.substr(0, this.targetChars.length - 1);
            this.cancel();
            this.targetChars = target;
            this.doJump(this.currentCommand, false)
        }
    }

    updateConfig = () => {
        this.decorator.initialize(this.config);
    }

    private async jumpTo(jumpPosition: JumpPosition, addCursor = false, multiEditor: boolean = true) {
        this.commandMode = addCursor ? CommandMode.AddCursor : CommandMode.Jump;

        try {
            var [editor, model] = await this.getLocationWithTimeout(multiEditor)
            this.done();
            switch (jumpPosition) {
                case JumpPosition.Before:
                    Utilities.goto(editor, model.line, model.char, addCursor);
                    break;

                case JumpPosition.After:
                    Utilities.goto(editor, model.line, model.char + 1, addCursor);
                    break;

                case JumpPosition.Smart:
                    Utilities.goto(editor, model.line, model.char + 1 + model.smartAdj, addCursor);
                    break;

                default:
                    throw "unexpected JumpPosition value";
            }
            let msg = !addCursor ? "metaGo: Jumped" : 'MetaGo: Cursor added/activated';
            vscode.window.setStatusBarMessage(msg, 3000);
        }
        catch (err) {
            this.cancel();
            if (typeof err === 'string') {
                console.log(err);
                return
            }
            console.log("metago:" + err.message + err.stack);
        }
    }

    private async selectTo(jumpPosition: JumpPosition, del = false) {
        this.commandMode = del ? CommandMode.Delete : CommandMode.Selection;
        let editor = vscode.window.activeTextEditor;
        const selection = editor.selections[editor.selections.length - 1];
        let position = selection.active;
        let fromLine = position.line;
        let fromChar = position.character;
        try {
            var [ed, model] = await this.getLocationWithTimeout(false)
            this.done();
            let toCharacter = model.char;

            switch (jumpPosition) {
                case JumpPosition.Before:
                    break;
                case JumpPosition.After:
                    toCharacter++;
                    break;
                case JumpPosition.Smart:
                    toCharacter += (1 + model.smartAdj);
                    break;
                default:
                    throw "unexpected JumpPosition value";
            }

            del
                ? Utilities.delete(editor, fromLine, fromChar, model.line, toCharacter)
                : Utilities.select(editor, fromLine, fromChar, model.line, toCharacter);

            vscode.window.setStatusBarMessage(`metaGo: ${del ? 'Delete' : 'Selected'}`, 3000);
        }
        catch (err) {
            this.cancel();
            console.log("metago:" + err);
        }
    }

    private done() {
        this.isJumping = false;
    }

    private cancel() {
        while (Input.instances.length > 0) {
            Input.instances[0].cancelInput();
        }
        this.isJumping = false;
    }

    private jumpTimeoutId = null;

    private async getLocationWithTimeout(multiEditor: boolean) {

        if (!this.isJumping) {
            this.isJumping = true;

            this.jumpTimeoutId = setTimeout(() => { this.jumpTimeoutId = null; this.cancel(); }, this.config.jumper.timeout);
            let canceled = false;
            try {
                vscode.commands.executeCommand('setContext', "metaGoJumping", true);
                var model = await this.getLocation(multiEditor);
                return model;
            }
            catch (e) {
                if (e === CANCEL_MSG) {
                    canceled = true;
                }
                throw e;
            }
            finally {
                if (!canceled)
                    vscode.commands.executeCommand('setContext', "metaGoJumping", false);

                if (this.jumpTimeoutId) {
                    clearTimeout(this.jumpTimeoutId);
                    this.jumpTimeoutId = null;
                }
            }
        } else {
            throw new Error('metago: reinvoke goto command');
        }
    }

    private async getLocation(multiEditor: boolean, enableSequentialTargetChars = true): Promise<[vscode.TextEditor, DecorationModel]> {
        let inputEditor = vscode.window.activeTextEditor;
        if (!inputEditor) {
            inputEditor = vscode.window.visibleTextEditors[0];
            if (!inputEditor) {
                throw new Error('no visible editor');
            }
            Utilities.goto(inputEditor);
        }
        await vscode.commands.executeCommand("workbench.action.focusActiveEditorGroup");

        let msg = this.commandMode === CommandMode.Selection
            ? "metaGo: Select to..."
            : this.commandMode === CommandMode.Jump
                ? "metaGo: Jump to..."
                : this.commandMode === CommandMode.Delete
                    ? 'MetaGo: Delete to...'
                    : 'MetaGo: Add cursor at...';

        let messageDisposable = vscode.window.setStatusBarMessage(msg, this.config.jumper.timeout);

        try {
            this.commandIndicator.addCommandIndicator(inputEditor, this.commandMode);

            if (this.targetChars === "") {
                this.targetChars = await this.getTargetChar(inputEditor);

                if (!this.targetChars) {
                    throw new Error('no target location char input')
                }
                if (this.targetChars && this.targetChars.length > 1)
                    this.targetChars = this.targetChars.substring(0, 1);
            }

            let res = await this.getLocationFromTargetChars(inputEditor, multiEditor, enableSequentialTargetChars);
            return res;
        } catch (reason) {
            if (!reason) reason = new Error("Canceled!");
            this.commandIndicator.removeCommandIndicator(inputEditor);
            vscode.window.setStatusBarMessage(`metaGo: ${reason}`, 3000);
            throw reason;
        } finally {
            this.commandIndicator.removeCommandIndicator(inputEditor);
            messageDisposable.dispose();
        }
    }

    private getTargetChar = (editor: vscode.TextEditor) => {
        let result = new Input(this.config)
            .input(editor, (v) => {
                this.commandIndicator.removeCommandIndicator(editor);
                return v;
            })
        return result;
    }

    private async getLocationFromTargetChars(inputEditor: vscode.TextEditor, multiEditor: boolean, enableSequentialTargetChars: boolean, rippleSupport = true): Promise<[vscode.TextEditor, DecorationModel]> {
        if (rippleSupport && !enableSequentialTargetChars) throw new Error("ripple support must with sequential target chars enable")

        var editor: vscode.TextEditor = null;
        var models: DecorationModel[] = null;
        var model: DecorationModel = null;
        if (!multiEditor) {
            rippleSupport = false;
        }
        if (this.targetChars === this.config.decoration.hide.triggerKey) {
            enableSequentialTargetChars = false;
            rippleSupport = false;
        }
        let { editorToLineCharIndexesMap, lettersExclude } = await this.findAll(multiEditor, inputEditor, enableSequentialTargetChars);
        if (editorToLineCharIndexesMap.size === 0) throw new Error(`metaGo: no match in codes for target chars: ${this.targetChars}`);

        let editorToModelsMap = this.decorationModelBuilder.buildDecorationModel(editorToLineCharIndexesMap, lettersExclude, enableSequentialTargetChars, this.targetChars.length, rippleSupport);
        // here, we have editorToModelsMap.size > 1 || models.length > 1
        let isTargetChar = false; // if is target char, not jump, fix type multi chars may edit doc
        do {
            let { map, letter } = await this.getExactLocation(editorToModelsMap, this.targetChars, enableSequentialTargetChars);
            if (map.size === 0) {
                let error = `metaGo: no match in codes for target chars: ${this.targetChars}`;
                if (!enableSequentialTargetChars)
                    throw new Error(error);
                // find
                this.targetChars += letter;
                let lineCharMap = new Map<vscode.TextEditor, ILineCharIndexes>();
                let excludeLetters = new Set<string>()
                editorToLineCharIndexesMap.forEach((m, e) => {
                    let { lineCharIndexes, followingChars } = this.findInModel(e, m.indexes, this.targetChars);
                    if (enableSequentialTargetChars)
                        followingChars.forEach(v => excludeLetters.add(v));
                    if (lineCharIndexes.indexes.length > 0)
                        lineCharMap.set(e, lineCharIndexes);
                });

                if (lineCharMap.size === 0)
                    throw new Error(error);
                // build model
                editorToModelsMap = this.decorationModelBuilder.buildDecorationModel(lineCharMap, excludeLetters, enableSequentialTargetChars, this.targetChars.length, rippleSupport);
                editorToLineCharIndexesMap = lineCharMap;
                isTargetChar = true;
            }
            else {
                editorToModelsMap = map;
                isTargetChar = false;
            }
            [editor, models] = editorToModelsMap.entries().next().value; // first entry
        } while (isTargetChar || editorToModelsMap.size > 1 || models.length > 1);
        model = models[0];
        return [editor, model];
    }

    private async findAll(multiEditor: boolean, inputEditor: vscode.TextEditor, enableSequentialTargetChars: boolean) {
        let editorToLineCharIndexesMap = new Map<vscode.TextEditor, ILineCharIndexes>();
        let editors = multiEditor ? [inputEditor, ...vscode.window.visibleTextEditors.filter(e => e !== inputEditor)] : [inputEditor];
        let lettersExclude = new Set<string>();
        for (let editor of editors) {
            var jumpRange = editor.visibleRanges;
            let { lineCharIndexes, followingChars } = this.find(editor, jumpRange, this.targetChars);
            if (enableSequentialTargetChars)
                followingChars.forEach(v => lettersExclude.add(v));
            if (lineCharIndexes.indexes.length > 0)
                editorToLineCharIndexesMap.set(editor, lineCharIndexes);
        }
        return { editorToLineCharIndexesMap, lettersExclude };
    }

    private isInText(text: string, char: number, targetChars: string) {
        var targetLowCase = targetChars.toLocaleLowerCase();
        let lastIndex = targetChars.length - 1;
        var last = targetChars[lastIndex];
        let lastLowCase = targetLowCase[lastIndex];
        let ignoreCase = lastLowCase === last; // no UpperCase
        let str = text.substring(char, char + targetChars.length);
        str = str.padEnd(targetChars.length, '\n');
        let r = (str.toLocaleLowerCase() === targetLowCase) && (ignoreCase ? true : str[lastIndex] === last);
        return r;
    }

    private findInModel(editor: vscode.TextEditor, models: LineCharIndex[], targetChars: string) {
        let { selection } = editor;
        let lineCharIndexes: ILineCharIndexes = {
            lowIndexNearFocus: -1,
            highIndexNearFocus: -1,
            indexes: [],
            firstIndexInParagraph: -1,
            lastIndexInParagraph: -1,
        };

        let followingChars = new Set<string>()

        let ms = models.filter((m) => {
            let r = this.isInText(m.text, m.char, targetChars)
            let next = m.text[m.char + targetChars.length];
            if (r && next) {
                followingChars.add(next);
            }
            return r;
        });
        lineCharIndexes.indexes = ms;
        this.updateIndexes(selection.active.line, selection.active.character, lineCharIndexes);

        return { lineCharIndexes, followingChars };
    }

    private find = (editor: vscode.TextEditor, ranges: vscode.Range[], targetChars: string) => {
        if (ranges.length === 0) return;

        let { document, selections } = editor;
        const selection = selections[selections.length - 1];
        let line = selection.active.line;
        let char = selection.active.character;
        if (selection.active.line < ranges[0].start.line || selection.active.line > ranges[ranges.length - 1].end.line) {
            line = ViewPort.viewPortCenter(editor, ranges).line;
            char = 0;
        }

        let lineCharIndexes: ILineCharIndexes = {
            lowIndexNearFocus: -1,
            highIndexNearFocus: -1,
            indexes: [],
            firstIndexInParagraph: -1,
            lastIndexInParagraph: -1,
        };

        let followingChars = new Set<string>();

        for (const range of ranges) {
            if (range.isEmpty) continue;

            let start = range.start;
            let end = range.end;
            for (let lineIndex = start.line; lineIndex <= end.line; lineIndex++) {
                let text: string;
                if (range.isSingleLine) {
                    text = document.getText(range)
                } else {
                    let line = document.lineAt(lineIndex);
                    text = line.text
                    if (lineIndex === start.line && start.character !== 0) {
                        text = text.substring(range.start.character);
                    } else if (lineIndex === end.line && end.character !== line.range.end.character) {
                        text = text.substring(0, end.character);
                    }
                }

                if (text.trim() === '') {
                    if (lineCharIndexes.firstIndexInParagraph < lineCharIndexes.indexes.length && lineIndex < line) {
                        lineCharIndexes.firstIndexInParagraph = lineCharIndexes.indexes.length; // next index
                    }
                    if (lineIndex > line && lineCharIndexes.lastIndexInParagraph === -1) {
                        lineCharIndexes.lastIndexInParagraph = lineCharIndexes.indexes.length - 1; // current last item index
                    }
                }

                let { indexes, followingChars: followingCharsInLine } = this.indexesOf(lineIndex, text, targetChars);
                for (const ind of indexes) {
                    lineCharIndexes.indexes.push(ind);
                }
                followingCharsInLine.forEach(char => followingChars.add(char))
            }
        }

        this.updateIndexes(line, char, lineCharIndexes);
        return { lineCharIndexes, followingChars }
    }

    private updateIndexes(line: number, char: number, lineCharIndexes: ILineCharIndexes) {

        lineCharIndexes.indexes.forEach((m, i) => {
            let lineIndex = m.line;
            if (lineIndex < line) { //up
                lineCharIndexes.lowIndexNearFocus = i;
            }
            else if (lineIndex == line) {
                if (m.char <= char) { // left
                    lineCharIndexes.lowIndexNearFocus = i;
                }
            }

        });


        if (lineCharIndexes.firstIndexInParagraph === -1 && lineCharIndexes.indexes.length > 0) {
            lineCharIndexes.firstIndexInParagraph = 0;
        }

        if (lineCharIndexes.lastIndexInParagraph === -1) { // no empty line after active line
            lineCharIndexes.lastIndexInParagraph = lineCharIndexes.indexes.length - 1;
        }

        if (lineCharIndexes.firstIndexInParagraph === lineCharIndexes.indexes.length) { // no index after empty line
            lineCharIndexes.firstIndexInParagraph = -1;
            lineCharIndexes.lastIndexInParagraph = -1;
        }

        if (lineCharIndexes.lowIndexNearFocus !== lineCharIndexes.indexes.length - 1)
            lineCharIndexes.highIndexNearFocus = lineCharIndexes.lowIndexNearFocus + 1;
    }

    private smartAdjBefore(str: string, char: string, index: number): SmartAdjustment {
        let regexp = new RegExp('\\w');
        if (this.smartAdjBeforeRegex(str, char, index, regexp) === SmartAdjustment.Before) {
            return SmartAdjustment.Before;
        }
        regexp = new RegExp(/[^\w\s]/);
        return this.smartAdjBeforeRegex(str, char, index, regexp);
    }

    private smartAdjBeforeRegex(str: string, char: string, index: number, regexp: RegExp): SmartAdjustment {

        if (regexp.test(char)) {
            if (index === 0 && str.length !== 1) {
                if (regexp.test(str[1])) return SmartAdjustment.Before;
            } else {
                if (str[index + 1] && regexp.test(str[index + 1]) && !regexp.test(str[index - 1]))
                    return SmartAdjustment.Before;
            }
        }
        return SmartAdjustment.Default;
    }

    private indexesOf = (line: number, textInline: string, targetChars: string) => {
        let indexes: LineCharIndex[] = [];
        let followingChars = new Set<string>();
        if (targetChars && targetChars.length === 0) {
            return { indexes, followingChars }
        }

        if (targetChars[0] === '\n') {
            indexes.push(new LineCharIndex(line, textInline.length, textInline))
            return { indexes, followingChars };
        }

        for (var i = 0; i < textInline.length; i++) {
            let found = this.isInText(textInline, i, targetChars)
            if (found) {
                let adj = this.smartAdjBefore(textInline, targetChars[0], i);
                indexes.push(new LineCharIndex(line, i, textInline, adj));
                let followingChar = textInline[i + targetChars.length];
                if (followingChar) followingChars.add(followingChar);
            }

        }
        return { indexes, followingChars };
    }

    private getExactLocation = async (editorToModelsMap: Map<vscode.TextEditor, DecorationModel[]>, targetChars: string, enableSequentialTargetChars: boolean) => {
        // show location candidates
        var decorators = this.decorator.createAll(editorToModelsMap, targetChars, enableSequentialTargetChars);

        const targetCharsInStatus = targetChars.replace(/\n/g, `\\n`).replace(/\t/g, '\\t');
        let msg = this.commandMode === CommandMode.Selection ?
            `metaGo: Select to '${targetCharsInStatus}'` :
            this.commandMode === CommandMode.Jump ?
                `metaGo: Jump to '${targetCharsInStatus}'` :
                `MetaGo: add/activate cursor at ${targetCharsInStatus}`;
        let messageDisposable = vscode.window.setStatusBarMessage(msg, this.config.jumper.timeout);

        try {
            let editor = vscode.window.activeTextEditor ?? vscode.window.visibleTextEditors[0];
            // wait for first code key
            var letter = await new Input(this.config).onKey(this.config.decoration.hide.triggerKey, editor, v => v, 'type the character to goto',
                k => { // down
                    if (this.jumpTimeoutId != null) clearTimeout(this.jumpTimeoutId);
                    this.decorator.hideAll(decorators)
                }, k => { // up
                    this.jumpTimeoutId = setTimeout(() => { this.jumpTimeoutId = null; this.cancel(); }, this.config.jumper.timeout);
                    this.decorator.showAll(decorators);
                }, k => {
                }
            );

            this.decorator.removeAll(decorators, enableSequentialTargetChars);
            if (!letter) throw new Error('no key code input')

            let map = new Map<vscode.TextEditor, DecorationModel[]>();
            editorToModelsMap.forEach((models, editor) => {
                // filter target candidates
                let md = models.filter(model => {
                    if (model.code[0] && model.code[0] === letter) {
                        model.code = model.code.substring(1)
                        return true;
                    }
                    return false;
                })

                if (md.length !== 0)
                    map.set(editor, md)
            });
            return { map, letter };

        } catch (e) {
            this.decorator.removeAll(decorators, enableSequentialTargetChars);
            throw e;
        } finally {
            messageDisposable.dispose();
        }

    }
}