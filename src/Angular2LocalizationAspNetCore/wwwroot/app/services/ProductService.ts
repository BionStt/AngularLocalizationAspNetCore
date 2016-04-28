﻿import { Injectable, EventEmitter, Output } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import { Product } from './Product';
import { LocaleService } from 'angular2localization/angular2localization';

@Injectable()
export class ProductService {

    @Output() changedProductData = new EventEmitter<Product[]>();
    public Products: Product[];

    @Output() changedCurrency = new EventEmitter<string>();
    public SelectedCurrency: string;

    private actionUrl: string;
    private headers: Headers;
    private isoCode: string;

    constructor(private _http: Http, private _configuration: Configuration, public _locale: LocaleService) {
        this.actionUrl = `${_configuration.Server}api/Shop/`;       
    }

    private setHeaders() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    // http://localhost:5000/api/Shop/AvailableProducts?culture=de-CH
    // http://localhost:5000/api/Shop/AvailableProducts?culture=it-CH
    // http://localhost:5000/api/Shop/AvailableProducts?culture=fr-CH
    // http://localhost:5000/api/Shop/AvailableProducts?culture=en-US
    public GetAvailableProducts = (): Observable<Product[]> => {
        console.log(this._locale.getCurrentLanguage());
        console.log(this._locale.getCurrentCountry());
        this.isoCode = `${this._locale.getCurrentLanguage()}-${this._locale.getCurrentCountry()}`; 

        this.setHeaders();
        return this._http.get(`${this.actionUrl}AvailableProducts?culture=${this.isoCode}`, {
            headers: this.headers
        }).map(res => res.json());
    }

    public GetProducts() {
        console.log('ProductService:GetProducts starting...');
        this.GetAvailableProducts()
            .subscribe((data) => {
                this.Products = data;
            },
            error => console.log(error),
            () => {
                this.changedProductData.emit(this.Products);
                console.log('ProductService:GetProducts completed');
            }
        );
    }

    public UpdateCurrency(currency: string) {
        this.SelectedCurrency = currency;
        this.changedCurrency.emit(currency);
    }
    
}