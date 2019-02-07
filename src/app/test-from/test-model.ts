import { Injectable } from "@angular/core";

@Injectable()
export class TestModel
{
    projectName:String = 'Hallo';
    enableValidator:Boolean = true;

    constructor() {

    }
}