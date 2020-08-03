import { CommentModel } from './models/comment.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(items: CommentModel[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(item => {
      return item.name.toLocaleLowerCase().includes(searchText) ||
      item.email.toLocaleLowerCase().includes(searchText) ||
      item.body.toLocaleLowerCase().includes(searchText);
    });
  }
}