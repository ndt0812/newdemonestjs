import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";
import { ApplicationTypeEnums } from "src/utils/enums.utils";
import { Transform } from "class-transformer";
import { lowerCaseTransformer } from "src/utils/transformers/lower-case.transformer";

export class CreateUserDto {

    @ApiProperty({ example: `YourUserName` })
    @Transform(lowerCaseTransformer)
    UserName: string | null;

    @ApiProperty({ example: `YourName` })
    DisplayName: string | null;

    ApplicationType: ApplicationTypeEnums;

    @ApiProperty({ example: "123456" })
    Password: string | null;

    @ApiProperty({ example: "123456" })
    RePassword: string | null;

    @ApiProperty({ example: `false` })
    @IsBoolean()
    IsAdmin: boolean;

}
