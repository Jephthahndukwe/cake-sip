interface PaymentData {
  name: string;
  email: string;
  phone: string;
  ticketType: 'solo' | 'besties';
  quantity: number;
  amount: number;
  reference: string;
  cakeFlavors: string[];
  decorationColor: string;
  cakeTopper: string;
  cakeName: string;
  karaokeInterested: boolean;
  karaokeSongChoice: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class PaymentService {
  private static async saveToDatabase(paymentData: PaymentData) {
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to save payment');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error saving payment to database:', error);
      throw error;
    }
  }

  static async processPayment(paymentData: PaymentData) {
    try {
      // Save payment details to MongoDB
      const dbResult = await this.saveToDatabase(paymentData);
      
      if (dbResult.success) {
        return {
          success: true,
          paymentId: dbResult.paymentId,
          message: 'Payment processed and saved successfully'
        };
      } else {
        throw new Error('Failed to save payment');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed'
      };
    }
  }

  static async getPaymentByReference(reference: string) {
    try {
      const response = await fetch(`/api/payments?reference=${reference}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch payment');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw error;
    }
  }
}
