import { EventEmitter, OnChanges, OnInit, Renderer2, ElementRef } from '@angular/core';
export declare class NgQRCodeReaderComponent implements OnChanges, OnInit {
    private renderer;
    elementType: 'url' | 'dataurl' | 'canvas';
    cssClass: string;
    showQRCode: boolean;
    value: string;
    qrcElement: ElementRef;
    result: EventEmitter<{}>;
    private qrReader;
    Types: {
        TEXT_TYPE: string;
        EMAIL_TYPE: string;
        PHONE_TYPE: string;
        URL_TYPE: string;
        SMS_TYPE: string;
    };
    PATTERNS: {
        url: string;
        phone: string;
        email: string;
    };
    constructor(renderer: Renderer2);
    ngOnChanges(): void;
    error(error: any): void;
    find(pattern: any, str: any): false | any[];
    ngOnInit(): void;
    renderElement(element: any): void;
    render(type: any): void;
    decode(value: any): void;
}
