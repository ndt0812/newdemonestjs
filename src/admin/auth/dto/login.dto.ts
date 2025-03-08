import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import { lowerCaseTransformer } from "src/utils/transformers/lower-case.transformer";

export class CreateAuthDto {
    Id: number

    @ApiProperty({ example: 'admin' })
    @IsNotEmpty()
    @Transform(lowerCaseTransformer)
    UserName: string;

    @ApiProperty({ example: '123456' })
    Password: string;

    RoleId: number
}
