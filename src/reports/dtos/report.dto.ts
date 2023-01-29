import { Expose, Transform } from "class-transformer";


export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  approved: boolean;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  make: number;

  @Expose()
  model: number;

  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

}