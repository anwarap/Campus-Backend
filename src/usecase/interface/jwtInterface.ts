import { ID } from "../../domain/commen";

interface IJWT{
    generateAccessToken(id:ID): string;
    generateRefreshToken(id:ID): string;
}

export default IJWT;