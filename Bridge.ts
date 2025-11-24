//  Implementor ,This is the interface that all concrete implementations must follow.
interface PaymentPlatform {
  process(amount: number): void;
}

// --- Concrete Implementors ---
class StripePlatform implements PaymentPlatform {
  process(amount: number): void {
    console.log(`Processing $${amount} via Stripe`);
  }
}

class PayPalPlatform implements PaymentPlatform {
  process(amount: number): void {
    console.log(`Processing $${amount} via PayPal`);
  }
}

// --- Abstraction ---
abstract class PaymentMethod {
  constructor(protected platform: PaymentPlatform) {}

  abstract pay(amount: number): void;
}

// --- Refined Abstractions ---
class CreditCardPayment extends PaymentMethod {
  pay(amount: number) {
    console.log("Paying with Credit Card...");
    this.platform.process(amount);
  }
}

class WalletPayment extends PaymentMethod {
  pay(amount: number) {
    console.log("Paying with Wallet Balance...");
    this.platform.process(amount);
  }
}

// --- Usage  client
const stripeCreditCard = new CreditCardPayment(new StripePlatform());
stripeCreditCard.pay(100);

const paypalWallet = new WalletPayment(new PayPalPlatform());
paypalWallet.pay(50);
