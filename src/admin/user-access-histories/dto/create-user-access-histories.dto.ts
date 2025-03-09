import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { AccessTypeEnums, ApplicationTypeEnums } from "src/utils/enums.utils";

export class CreateUserAccessHistoriesDto {
    @ApiProperty({})
    @IsNotEmpty()
    UserId: number | null;

    @ApiProperty({})
    @IsNotEmpty()
    AccessType: AccessTypeEnums;
}
