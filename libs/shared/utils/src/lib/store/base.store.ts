// done
export class BaseStore<TData> {
  private data: TData | undefined;

  setData(data: TData) {
    this.data = data;
  }

  getData(): TData {
    if (this.data) return this.data;
    throw new Error('The store data was not set!');
  }

  hasData() {
    return Boolean(this.data);
  }

  removeData() {
    this.data = undefined;
  }
}
