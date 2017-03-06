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
        base: 'http://api.infobip.com',
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

    _get(props:URLPropsExtend) {
        const urlProps:URLProps = _.extend(this.props, props);
        return request.get( urlProps );
    }

    _post(props:URLPropsExtend) {
        const urlProps:URLProps = _.extend(this.props, props)
        return request.post(urlProps);
    }

    getBalance() {
        return this._get({
            url: this.urls.base + this.urls.balance
        });
    }

    getPreview(_text) {
        return this._post({
            url: this.urls.base + this.urls.preview,
            json: {
                text: _text
            }
        });
    }

    sendOne(_from, _to, _text) {
        return this._post({
            url: this.urls.base + this.urls.sendOne,
            json: {
                from: _from,
                to: _to,
                text: _text
            }
        });
    }

    sendMulti(_messages) {
        return this._post({
            url: this.urls.base + this.urls.sendMulti,
            json: _messages
        });
    }

    sendAdvanced(_messages) {
        return this._post({
            url: this.urls.base + this.urls.sendAdvanced,
            json: _messages
        });
    }

    getReports(_bulkId, _msgId, _limit) {
        if (!_limit) _limit = 50;

        return this._get({
            url: this.urls.base + this.urls.reports,
            json: {
                bulkId: _bulkId,
                messageId: _msgId,
                limit: _limit
            }
        })
    }

    getNumberContext(_numbers) {
        return this._post({
            url: this.urls.base + this.urls.numberContext,
            json: {
                to: _numbers
            }
        })
    }
}