export interface ProductData {
  title: string;
  price: number;
  currency: string;
  date: string;
  highestPrice: number;
  lowestPrice: number;
  dateHigh: string;
  dateLow: string;
  pid: number;

  /*Not api dependent*/
  /*Parent component dependent*/
  deleteClicked: boolean;
  refList: React.MutableRefObject<number[]>
}
