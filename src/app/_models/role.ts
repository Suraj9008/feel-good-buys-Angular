export enum Role {
    User = 'User',
    Admin = 'Admin'
}

interface Array<T> {
    toUpperCase(this: string[]): string[];
  }