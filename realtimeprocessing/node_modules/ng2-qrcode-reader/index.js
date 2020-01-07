import { Component, EventEmitter, Input, NgModule, Output, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

var QrCode = require('qrcode-reader').default;
var NgQRCodeReaderComponent = (function () {
    /**
     * @param {?} renderer
     */
    function NgQRCodeReaderComponent(renderer) {
        this.renderer = renderer;
        this.elementType = 'url';
        this.cssClass = 'qrcode-reader';
        this.showQRCode = true;
        this.value = '';
        this.result = new EventEmitter();
        this.Types = {
            TEXT_TYPE: 'TEXT_TYPE',
            EMAIL_TYPE: 'EMAIL_TYPE',
            PHONE_TYPE: 'PHONE_TYPE',
            URL_TYPE: 'URL_TYPE',
            SMS_TYPE: 'SMS_TYPE'
        };
        this.PATTERNS = {
            url: "/(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i",
            phone: "/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/",
            email: "/\S+@\S+\.\S+/"
        };
        this.qrReader = new QrCode();
    }
    /**
     * @return {?}
     */
    NgQRCodeReaderComponent.prototype.ngOnChanges = function () {
        this.decode(this.value);
        if (this.showQRCode) {
            this.render(this.elementType);
        }
    };
    /**
     * @param {?} error
     * @return {?}
     */
    NgQRCodeReaderComponent.prototype.error = function (error) {
        console.log(error);
    };
    /**
     * @param {?} pattern
     * @param {?} str
     * @return {?}
     */
    NgQRCodeReaderComponent.prototype.find = function (pattern, str) {
        var /** @type {?} */ arr = [], /** @type {?} */ matches;
        if (typeof pattern === "string") {
            pattern = new RegExp(pattern, "g");
        }
        else if (!(pattern instanceof RegExp)) {
            throw new Error("pattern must be string or RegExp object");
        }
        while (matches = pattern.exec(str)) {
            arr.push([matches.index, matches.index + matches[0].length - 1]);
        }
        return arr.length ? arr : false;
    };
    /**
     * @return {?}
     */
    NgQRCodeReaderComponent.prototype.ngOnInit = function () {
        var /** @type {?} */ that = this;
        this.qrReader.callback = function (error, result) {
            if (error) {
                that.error(error);
                return;
            }
            //console.log(result);
            //var r = that.find(that.PATTERNS.url,result.result);
            that.result.emit({ result: result.result, type: "text" });
            //that.renderResult(result.result);
        };
        //this.decodeByUrl(this.value);  
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NgQRCodeReaderComponent.prototype.renderElement = function (element) {
        for (var _i = 0, _a = this.qrcElement.nativeElement.childNodes; _i < _a.length; _i++) {
            var node = _a[_i];
            this.renderer.removeChild(this.qrcElement.nativeElement, node);
        }
        this.renderer.appendChild(this.qrcElement.nativeElement, element);
    };
    /**
     * @param {?} type
     * @return {?}
     */
    NgQRCodeReaderComponent.prototype.render = function (type) {
        var /** @type {?} */ element;
        switch (type) {
            case 'url':
            case 'dataurl':
                element = this.renderer.createElement('img');
                element.setAttribute("src", this.value);
                this.renderElement(element);
                break;
            case 'canvas':
            default:
                break;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgQRCodeReaderComponent.prototype.decode = function (value) {
        this.qrReader.decode(value);
    };
    return NgQRCodeReaderComponent;
}());
NgQRCodeReaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng2-qrcode-reader',
                template: "<div #qrcElement [class]=\"cssClass\"></div>",
                styles: []
            },] },
];
/**
 * @nocollapse
 */
NgQRCodeReaderComponent.ctorParameters = function () { return [
    { type: Renderer2, },
]; };
NgQRCodeReaderComponent.propDecorators = {
    'elementType': [{ type: Input, args: ['qrr-type',] },],
    'cssClass': [{ type: Input, args: ['qrr-class',] },],
    'showQRCode': [{ type: Input, args: ["qrr-show",] },],
    'value': [{ type: Input, args: ['qrr-value',] },],
    'qrcElement': [{ type: ViewChild, args: ['qrcElement',] },],
    'result': [{ type: Output, args: ['result',] },],
};

var NgQRCodeReaderModule = (function () {
    function NgQRCodeReaderModule() {
    }
    /**
     * @return {?}
     */
    NgQRCodeReaderModule.forRoot = function () {
        return {
            ngModule: NgQRCodeReaderModule,
            providers: []
        };
    };
    return NgQRCodeReaderModule;
}());
NgQRCodeReaderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    NgQRCodeReaderComponent,
                ],
                exports: [
                    NgQRCodeReaderComponent,
                ]
            },] },
];
/**
 * @nocollapse
 */
NgQRCodeReaderModule.ctorParameters = function () { return []; };

export { NgQRCodeReaderModule, NgQRCodeReaderComponent };
