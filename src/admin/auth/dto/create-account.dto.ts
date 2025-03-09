import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, Matches, MinLength, minLength } from "class-validator";
import { ApplicationTypeEnums } from "src/utils/enums.utils";
import { Transform } from "class-transformer";
import { lowerCaseTransformer } from "src/utils/transformers/lower-case.transformer";

export class CreateAccountDto {

    @ApiProperty({ required: true, example: `YourUserName`, description: "Tên đăng nhập" })
    @Transform(lowerCaseTransformer)
    @IsNotEmpty({ message: "Tên đăng nhập ko được để trống" })
    UserName: string | null;

    @ApiProperty({ required: true, example: `YourName`, description: "Tên hiển thị" })
    @IsNotEmpty({ message: "Tên hiển thị ko được để trống" })
    DisplayName: string | null;

    ApplicationType: ApplicationTypeEnums;

    @ApiProperty({ required: true, example: "123456", minLength: 6, default: 'Mật khẩu' })
    @MinLength(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    @Matches(/[^A-Za-z0-9]/, { message: "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt" })
    @Matches(/[A-Z]/, { message: "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa" })
    @Matches(/^\S*$/, { message: "Mật khẩu không được chứa khoảng trắng" })
    @IsNotEmpty({ message: "Mật khẩu ko được để trống" })
    Password: string | null;

    @ApiProperty({ required: true, example: "123456", description: 'Nhập lại mật khẩu' })
    RePassword: string | null;

    // @ApiProperty({ required: true, example: `false`, description: 'Có phải Admin ko?' })
    // @IsBoolean()
    // IsAdmin: boolean;

}
