import * as vscode from "vscode";

export class Config {
    decoration: DecoratorConfig = new DecoratorConfig();
    jumper: FinderConfig = new FinderConfig();
    loadConfig = () => {
        try {
            let config = vscode.workspace.getConfiguration("metaGo");

            this.decoration.useTextBasedDecorations = config.get<boolean>("decoration.useTextBasedDecorations", this.decoration.useTextBasedDecorations);

            this.decoration.bgColor = config.get<string>("decoration.backgroundColor", this.decoration.bgColor);
            this.decoration.bgOpacity = config.get<string>("decoration.backgroundOpacity", this.decoration.bgOpacity);

            this.decoration.color = config.get<string>("decoration.color", this.decoration.color);
            this.decoration.borderColor = config.get<string>("decoration.borderColor", this.decoration.borderColor);
            this.decoration.matchBackground = config.get<string>("decoration.matchBackground", this.decoration.matchBackground);
            this.decoration.targetFollowCharBackground = config.get<string>("decoration.targetFollowCharBackground", this.decoration.targetFollowCharBackground);
            
            this.decoration.width = config.get<number>("decoration.width", this.decoration.width);
            this.decoration.height = config.get<number>("decoration.height", this.decoration.height);

            this.decoration.x = config.get<number>("decoration.x", this.decoration.x);
            this.decoration.y = config.get<number>("decoration.y", this.decoration.y);

            this.decoration.fontSize = config.get<number>("decoration.fontSize", this.decoration.fontSize);
            this.decoration.fontWeight = config.get<string>("decoration.fontWeight", this.decoration.fontWeight);
            this.decoration.fontFamily = config.get<string>("decoration.fontFamily", this.decoration.fontFamily);

            this.jumper.characters = config.get<string>("decoration.characters", "k, j, d, f, l, s, a, h, g, i, o, n, u, r, v, c, w, e, x, m, b, p, q, t, y, z").split(/[\s,]+/);
            this.jumper.additionalSingleCharCodeCharacters = config.get<string>("decoration.additionalSingleCharCodeCharacters", "J,D,F,L,A,H,G,I,N,R,E,M,B,Q,T,Y").split(/[\s,]+/);
            this.decoration.hide.triggerKey = config.get<string>('decoration.hide.triggerKey');
            this.decoration.hide.triggerKeyDownRepeatInitialDelay = config.get<number>('decoration.hide.triggerKeyDownRepeatInitialDelay');
            this.decoration.hide.triggerKeyDownRepeatInterval = config.get<number>('decoration.hide.triggerKeyDownRepeatInterval');

            let timeout = config.get<number>("jumper.timeout", this.jumper.timeout);
            this.jumper.timeout = isNaN(timeout) ? 12000 : timeout * 1000;
        }
        catch (e) {
            vscode.window.showErrorMessage('metaGo: please double check your metaGo config->' + e);
        }
    }

}

class DecoratorHide {
    triggerKey: string='/';
    triggerKeyDownRepeatInitialDelay: number=550;
    triggerKeyDownRepeatInterval:number=60;
}

class DecoratorConfig {
    useTextBasedDecorations: boolean = false;

    bgOpacity: string = '0.8';
    bgColor: string = "lime,yellow";
    color: string = "white, blue";
    borderColor: string = "black";

    width: number = 12;
    height: number = 14;

    x: number = 2;
    y: number = 12;

    fontSize: number = 14;
    matchBackground = "editor.wordHighlightBackground";
    targetFollowCharBackground = "#4169E1"
    fontWeight: string = "normal";
    fontFamily: string = "Consolas";
    hide = new DecoratorHide();

}

class FinderConfig {
    characters: string[];
    additionalSingleCharCodeCharacters: string[];
    timeout: number = 12000;
}
