import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {

    normalize(s: any): any {
        let nullValue = '';
        if (s === null) {
            return nullValue;
        } else if (typeof s === 'string') {
            return s.toUpperCase();
        }
        return s;
    }

    transform(objArr: any[], property: string, order: string = 'asc'): any {
        console.log('Sort:', objArr, property, order);

        let sorted = objArr.sort((a, b): number => {

            //x & y are placeholders for a & b so they can later be restored after being changes to uppercase for sorting case insensitive
            let x = this.normalize(a[property]);
            let y = this.normalize(b[property]);

            if (x === y) return 0;
            if (order === 'desc') {
                return (x > y) ? -1 : 1;
            } else {
                return (x < y) ? -1 : 1;
            }

        });
        console.log('Sorted: ', sorted);
        return sorted;
    }
}