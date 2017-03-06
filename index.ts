import * as _ from 'lodash'
import * as request from "request-promise"

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
        });
    }

    public getPreview(text:string) {
        return this._post({
            url: this.urls.base + this.urls.preview,
            json: {
                text: text
            }
        });
    }

    public sendOne(from:string, to:string, text:string) {
        return this._post({
            url: this.urls.base + this.urls.sendOne,
            json: {
                from: from,
                to: to,
                text: text
            }
        });
    }

    public sendMulti(messages) {
        return this._post({
            url: this.urls.base + this.urls.sendMulti,
            json: messages
        });
    }

    public sendAdvanced(messages) {
        return this._post({
            url: this.urls.base + this.urls.sendAdvanced,
            json: messages
        });
    }

    public getReports(bulkId, msgId, limit) {
        if (!limit) limit = 50;

        return this._get({
            url: this.urls.base + this.urls.reports,
            json: {
                bulkId: bulkId,
                messageId: msgId,
                limit: limit
            }
        })
    }

    public getNumberContext(numbers:string) {
        return this._post({
            url: this.urls.base + this.urls.numberContext,
            json: {
                to: numbers
            }
        })
    }
}