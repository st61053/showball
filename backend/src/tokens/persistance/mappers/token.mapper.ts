import { TokenSchemaClass, TokenLevelSchemaClass } from "../schemas/token.schema";
import { Token } from "src/tokens/domain/token";

export class TokenMapper {
    public static toDomain(raw: TokenSchemaClass): Token {
        const token = new Token();
        token.textId = raw.textId;
        token.name = raw.name;
        token.description = raw.description;
        token.imageSrc = raw.imageSrc;
        token.levels = raw.levels.map((level) => ({
            coins: level.coins,
            points: level.points,
            exps: level.exps,
            nextLevelCost: level.nextLevelCost,
        }));
        token.maxLevel = raw.maxLevel;
        token.state = raw.state;
        return token;
    }

    public static toPersistence(token: Omit<Token, 'id'>): TokenSchemaClass {
        const tokenDoc = new TokenSchemaClass();
        tokenDoc.textId = token.textId;
        tokenDoc.name = token.name;
        tokenDoc.description = token.description;
        tokenDoc.imageSrc = token.imageSrc;
        tokenDoc.levels = token.levels.map((level) => ({
            coins: level.coins,
            points: level.points,
            exps: level.exps,
            nextLevelCost: level.nextLevelCost,
        }));
        tokenDoc.maxLevel = token.maxLevel;
        tokenDoc.state = token.state;
        return tokenDoc;
    }
}