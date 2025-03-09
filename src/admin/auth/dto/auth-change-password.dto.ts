import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class AuthChangePasswordDto {
  Id: number;

  @ApiProperty({ required: true, example: '123456', description: 'Nhập mật khẩu cũ' })
  @IsNotEmpty()
  Password: string;

  @ApiProperty({ required: true, example: "123456", minLength: 6, description: 'Mật khẩu mới' })
  @MinLength(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
  @Matches(/[^A-Za-z0-9]/, { message: "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt" })
  @Matches(/[A-Z]/, { message: "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa" })
  @Matches(/^\S*$/, { message: "Mật khẩu không được chứa khoảng trắng" })
  @IsNotEmpty({ message: "Mật khẩu ko được để trống" })
  NewPassword: string;

  @ApiProperty({ required: true, example: "123456", description: 'Nhập lại mật khẩu mới' })
  ReNewPassword: string;
}
