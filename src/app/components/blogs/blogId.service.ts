import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogDataService {
  private blogId: string | null = null;

  setBlogId(id: string): void {
    this.blogId = id;
  }

  getBlogId(): string | null {
    return this.blogId;
  }

  clearBlogId(): void {
    this.blogId = null;
  }
}
