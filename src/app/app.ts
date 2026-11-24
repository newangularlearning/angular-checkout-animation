import { Component, computed, signal } from '@angular/core';
import { cardFlip, checkoutFlow, successPop } from './checkout.animations';

type Stage = 'form' | 'processing' | 'done';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [cardFlip, checkoutFlow, successPop],
})
export class App {
  name = signal('');
  number = signal('');        // digits only
  expiry = signal('');
  cvc = signal('');
  flipped = signal(false);
  stage = signal<Stage>('form');

  flow = computed(() => (this.stage() === 'form' ? 'form' : 'pay'));

  // live number on the card
  cardNumber = computed(() =>
   this.number()
    .padEnd(16, '•')
    .match(/.{1,4}/g)!
    .join(' '));

  // generic brand from 1st digit
  brand = computed(() => {
   const d = this.number()[0];
   if (d === '4') return 'nova';
   if (d === '5') return 'orbit';
   if (d === '3') return 'axis';
   return 'card';
  });

  onName(v: string) { this.name.set(v.toUpperCase().slice(0, 22)); }

  onNumber(el: HTMLInputElement) {
    const digits = el.value.replace(/\D/g, '').slice(0, 16);
    this.number.set(digits);
    el.value = digits.replace(/(.{4})(?=.)/g, '$1 ');
  }

  onExpiry(el: HTMLInputElement) {
    const d = el.value.replace(/\D/g, '').slice(0, 4);
    el.value = d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
    this.expiry.set(el.value);
  }

  onCvc(el: HTMLInputElement) {
    el.value = el.value.replace(/\D/g, '').slice(0, 3);
    this.cvc.set(el.value);
  }

  pay() {
    if (this.stage() !== 'form') return;
    this.flipped.set(false);
    this.stage.set('processing');
    setTimeout(() => this.stage.set('done'), 2900);
  }
}
