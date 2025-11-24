// COMPONENT
interface PaymentMethod {
  pay(amount: number): void;
}

// CONCRETE COMPONENTS
class CardPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Paying $${amount} with Card.`);
  }
}

class MobileMoneyPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Paying $${amount} using Mobile Money.`);
  }
}

// DECORATOR
abstract class PaymentPlatform implements PaymentMethod {
  constructor(protected method: PaymentMethod) {}

  abstract pay(amount: number): void;
}

// CONCRETE DECORATOR: LOGGING
class LoggingPlatform extends PaymentPlatform {
  pay(amount: number): void {
    console.log("[LOG] Starting payment...");
    this.method.pay(amount);
    console.log("[LOG] Payment completed.");
  }
}

// CONCRETE DECORATOR: FRAUD CHECK
class FraudCheckPlatform extends PaymentPlatform {
  pay(amount: number): void {
    console.log("[FRAUD] Checking for suspicious activity...");
    this.method.pay(amount);
  }
}

// USAGE
const payment: PaymentMethod = new LoggingPlatform(
  new FraudCheckPlatform(new CardPayment())
);

payment.pay(1000);
