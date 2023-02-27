import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter'
})
export class filterPipe implements PipeTransform {

    transform(value: any, arg: any):any {
        if (arg === '' || arg.lenght < 3)return value;
        const result = [];
        for (const dt of value){
            if (dt.description.toLowerCase().indexOf(arg.toLowerCase()) >-1){
                result.push(dt)
            };
        };
        return result;
    }
}