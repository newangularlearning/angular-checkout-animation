import {
 trigger, state, style,
 transition, animate,
 query, group, keyframes,
 stagger,
} from '@angular/animations';

// 1 · CVC focus flips card
export const cardFlip =
 trigger('cardFlip', [
  state('front', style({
   transform: 'rotateY(0)'
  })),
  state('back', style({
   transform: 'rotateY(180deg)'
  })),
  transition('front<=>back',
   animate('600ms ease-in-out')
  ),
 ]);

// 2 · Pay: form out, card in
export const checkoutFlow =
 trigger('checkoutFlow', [
  transition('form => pay', [
   group([
    query('.form', [
     style({ opacity: 1,
      transform: 'none' }),
     animate('400ms ease-in',
      style({ opacity: 0,
       transform:
        'translateY(40px)' })),
    ]),
    query('.card-wrap', [
     style({ transform:
      'translateX(0)' }),
     animate(
      '700ms 150ms ease-out',
      style({ transform:
       'translateX(320px)' })),
    ]),
   ]),
  ]),
 ]);

// 3 · Success: bounce + fade
export const successPop =
 trigger('successPop', [
  transition(':enter', [
   query('.check, p',
    style({ opacity: 0 })),
   query('.check', animate(
    '600ms ease-out',
    keyframes([
     style({ opacity: 1,
      scale: 0 }),
     style({ scale: 1.25 }),
     style({ scale: 0.9 }),
     style({ scale: 1 }),
    ]))),
   query('p', stagger(120,
    animate('300ms',
     style({ opacity: 1 })))),
  ]),
 ]);
