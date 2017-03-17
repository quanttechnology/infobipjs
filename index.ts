import * as _ from 'lodash'
import * as request from "request-promise"


//Interfaces for getPreview function of InfobipSMS class.
export interface InfobipLanguage {
    languageCode: string;
}

export interface InfobipPreviewConfiguration {
    language: Array<InfobipLanguage>;
    transliteration: string;
}


export interface InfobipPreview {
    textPreview: string,
        messageCount: number,
        charactersRemaining: number,
        configuration: InfobipPreviewConfiguration
}
//Interfaces for sendOne function of InfobipSMS class.
export interface InfobipSMSStatus{
    groupId: number;
    groupName: string;
    id: number;
    name: string;
    description: string;
}


//Interfaces for sendAdvanced function of InfobipSMS class.
export interface InfobipSendAdvancedResult {
    bulkId: string;
    messages: Array<InfobipSMSResponseDetail>;
}


export interface InfobipDeliveryResult {
    bulkId: string;
    messageId: string;
    to: string;
    from: string;
    sentAt: string;
    doneAt: string;
    smsCount: number;
    mccMnc: string;
    callbackData: string;
    price: InfobipSMSPrice;
    status: InfobipSMSStatus;
    error: InfobipError;
}

//Interfaces for getNumberContext function of InfobipSMS class.
export interface InfobipMobileNetwork{
    networkPrefix: number;
    countryPrefix: number;
}

export interface InfobipNumberContextResponse {
    to: string;
    mccMnc: string;
    imsi: string;
    originalNetwork: InfobipMobileNetwork;
    ported: boolean;
    roaming: boolean;
    status: InfobipSMSStatus;
    error: InfobipError;
}


export interface InfobipURL{
    base: string;
    balance: string;
    numberContext: string;
    preview: string;
    reports: string;
    sendOne: string;
    sendMulti: string;
    sendAdvanced: string;
}

export interface InfobipBalanceResponse{
    balance:number;
    currency:string;
}

export interface InfobipPreviewResponse{
    originalText:string;
    previews: InfobipPreview[];
}

export interface InfobipSMSRequest{
    to:string;
    text:string;
    from?:string;
}

export interface InfobipMultipleSMSRequest{
    messages:InfobipSMSRequest[];
}

export interface InfobipSingleSMSResponse{
    bulkId:string;
    messages:InfobipSMSResponseDetail[];
}
export interface InfobipMultipleSMSResponse{
    bulkId:string;
    messages:InfobipSMSResponseDetail[];
}

export interface InfobipSMSStatus{
    groupId:number;
    groupName:string;
    id:number;
    name:string;
    description:string
    action:string
}


export interface InfobipSMSResponseDetail{
    to:string;
    status:InfobipSMSStatus
    smsCount:number;
    messageId:string;
}

export interface InfobipSMSReportResponse{
    results:InfobipDeliveryResult[];
}


export interface InfobipError{
    groupId:number;
    groupName:string;
    id:number;
    name:string;
    description:string;
    permanent:boolean;
}
export interface InfobipSMSPrice{
    pricePerMessage:number;
    currency:string;
}


export interface URLProps extends URLPropsBase , URLPropsExtend{

}


export interface URLPropsBase{
    headers:{
        'Authorization':string;
        'Accept':string;
    }
}

export interface URLPropsExtend{
    url:string;
    json?:any;
}
export class InfobipSMS {
    urls:InfobipURL = {
        base: 'https://api.infobip.com',
        balance: '/account/1/balance',
        numberContext: '/number/1/query',
        preview: '/sms/1/preview',
        reports: '/sms/1/reports',
        sendOne: '/sms/1/text/single',
        sendMulti: '/sms/1/text/multi',
        sendAdvanced: '/sms/1/text/advanced'
    };
    props:URLPropsBase;
    constructor(username:string, password:string) {
        this.props = {
            headers: {
                'Authorization': 'Basic ' + (new Buffer(username + ':' + password)).toString('base64'),
                'Accept': 'application/json'
            }
        }
    }

    private _get(props:URLPropsExtend) {
        const urlProps:URLProps = _.extend(this.props, props);
        return request.get( urlProps );
    }

    private _post(props:URLPropsExtend) {
        const urlProps:URLProps = _.extend(this.props, props);
        return request.post(urlProps);
    }

    public getBalance() {
        return this._get({
            url: this.urls.base + this.urls.balance
        }) as PromiseLike<InfobipBalanceResponse>;
    }

    public getPreview(text:string) {
        return this._post({
            url: this.urls.base + this.urls.preview,
            json: {
                text: text
            }
        }) as PromiseLike<InfobipPreviewResponse>;
    }

    public sendOne(to:string, text:string, from?:string) {
        return this._post({
            url: this.urls.base + this.urls.sendOne,
            json: {
                from: from,
                to: to,
                text: text
            }
        }) as PromiseLike<InfobipSingleSMSResponse>;
    }

    public sendMulti(messages:InfobipMultipleSMSRequest) {
        return this._post({
            url: this.urls.base + this.urls.sendMulti,
            json: messages
        }) as PromiseLike<InfobipMultipleSMSResponse>;
    }

    public getAllReport(limit:number=50){
        return this._get({
            url: this.urls.base + this.urls.reports,
            json: {
                limit: limit
            }
        }) as PromiseLike<InfobipSMSReportResponse>;
    }
    public getReportByMessageID(msgId?:string){
        return this._get({
            url: this.urls.base + this.urls.reports,
            json: {
                messageId: msgId,
                limit: 1
            }
        }) as PromiseLike<InfobipSMSReportResponse>;
    }
    public getReportByBulkID(bulkId:string, limit:number=50) {

        return this._get({
            url: this.urls.base + this.urls.reports,
            json: {
                bulkId: bulkId,
                limit: limit
            }
        }) as PromiseLike<InfobipSMSReportResponse>;
    }

    public sendAdvanced(messages) {
        return this._post({
            url: this.urls.base + this.urls.sendAdvanced,
            json: messages
        }) as PromiseLike<InfobipSendAdvancedResult>;
    }
    public getNumberContext(numbers:string) {
        return this._post({
            url: this.urls.base + this.urls.numberContext,
            json: {
                to: numbers
            }
        }) as PromiseLike<InfobipNumberContextResponse>;
    }
}
