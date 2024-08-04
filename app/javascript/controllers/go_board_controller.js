import { Controller } from '@hotwired/stimulus';
import '../components/GoBoard.js';

export default class extends Controller {
  connect() {
    this.element.innerHTML = ``;
  }
}