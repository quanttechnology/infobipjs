interface AccountBalance {
    balance: number;
    currency: string;
}
interface Language {
    languageCode: string;
}
interface PreviewConfiguration {
    language: Array<Language>;
    transliteration: string;
}
interface Preview {
    textPreview: string;
    messageCount: number;
    charactersRemaining: number;
    configuration: Array<PreviewConfiguration>;
}
interface MessagePreview {
    originalText: string;
    previews: Array<Preview>;
}
interface MessageStatus {
    groupId: number;
    groupName: string;
    id: number;
    name: string;
    description: string;
}
interface Message {
    to: string;
    status: MessageStatus;
    smsCount: number;
    messageId: string;
}
interface SendOneResult {
    messages: Array<Message>;
}
interface SendMultiResult {
    bulkId: string;
    messages: Array<Message>;
}
interface SendAdvancedResult {
    bulkId: string;
    messages: Array<Message>;
}
interface MessagePrice {
    pricePerMessage: number;
    currency: string;
}
interface MessageError extends MessageStatus {
    permanent: boolean;
}
interface DeliveryResult {
    messageId: string;
    to: string;
    sentAt: string;
    doneAt: string;
    smsCount: number;
    mccMnc: string;
    price: MessagePrice;
    callbackData: string;
    status: MessageStatus;
    error: MessageError;
}
interface MobileNetwork {
    networkPrefix: number;
    countryPrefix: number;
}
interface NumberResult {
    to: string;
    mccMnc: string;
    imsi: string;
    originalNetwork: MobileNetwork;
    ported: boolean;
    roaming: boolean;
    status: MessageStatus;
    error: MessageError;
}
