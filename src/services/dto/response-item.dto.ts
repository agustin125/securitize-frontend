
export class ResponseDto {
  unsignedTx?: {
    to: string;
    data: string;
    value?: string;
  };
  message: string;

  constructor(unsignedTx: { to: string; data: string; value?: string }, message: string) {
    this.unsignedTx = unsignedTx;
    this.message = message;
  }
}

