import ResourceManagementClient from "azure-arm-resource/lib/resource/resourceManagementClient";
import { SubscriptionItem } from "../azure-auth/azureAuth";
import { ServiceClientCredentials } from "ms-rest";
import { SubscriptionError } from "../../errors";
import { MESSAGES } from "../../constants/messages";

export class ResourceManager {
  private AzureResourceManagementClient: ResourceManagementClient | undefined;

  private createResourceManagementClient(userSubscriptionItem: SubscriptionItem): ResourceManagementClient {
    const userCredentials: ServiceClientCredentials = userSubscriptionItem.session.credentials;
    if (
      userSubscriptionItem === undefined ||
      userSubscriptionItem.subscription === undefined ||
      userSubscriptionItem.subscriptionId === undefined
    ) {
      throw new SubscriptionError(MESSAGES.ERRORS.SUBSCRIPTION_NOT_DEFINED);
    }
    return new ResourceManagementClient(
      userCredentials,
      userSubscriptionItem.subscriptionId,
      userSubscriptionItem.session.environment.resourceManagerEndpointUrl
    );
  }

  public getResourceManagementClient(userSubscriptionItem: SubscriptionItem): ResourceManagementClient {
    if (
      this.AzureResourceManagementClient === undefined ||
      this.AzureResourceManagementClient.subscriptionId !== userSubscriptionItem.subscriptionId
    ) {
      this.AzureResourceManagementClient = this.createResourceManagementClient(userSubscriptionItem);
    }
    return this.AzureResourceManagementClient;
  }
}
