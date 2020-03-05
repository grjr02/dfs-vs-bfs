export default class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
 
    if (this.isEmpty()) return "Its empty";
    return this.items.shift();
  }

  front() {

    if (this.isEmpty()) return "Queue Empty";
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
