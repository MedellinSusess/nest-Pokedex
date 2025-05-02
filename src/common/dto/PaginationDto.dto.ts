import { IsNumber, IsOptional, IsPositive, Min, min } from "class-validator";


export class paginationDto {
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset?: number;
}