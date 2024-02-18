import { ChallengeSchemaClass } from "../schemas/challenge.schema";
import { Challenge } from "src/challenges/domain/challenge";

export class ChallengeMapper {
    public static toDomain(raw: ChallengeSchemaClass): Challenge {
        const challenge = new Challenge();
        challenge.textId = raw.textId;
        challenge.name = raw.name;
        challenge.description = raw.description;
        challenge.imageSrc = raw.imageSrc;
        challenge.points = raw.points;
        challenge.coins = raw.coins;
        challenge.exps = raw.exps;
        challenge.fromDate = raw.fromDate;
        challenge.toDate = raw.toDate;
        challenge.state = raw.state;
        return challenge;
    }

    public static toPersistence(challenge: Omit<Challenge, 'id'>): ChallengeSchemaClass {
        const challengeDoc = new ChallengeSchemaClass();
        challengeDoc.textId = challenge.textId;
        challengeDoc.name = challenge.name;
        challengeDoc.description = challenge.description;
        challengeDoc.imageSrc = challenge.imageSrc;
        challengeDoc.points = challenge.points;
        challengeDoc.coins = challenge.coins;
        challengeDoc.exps = challenge.exps;
        challengeDoc.fromDate = challenge.fromDate;
        challengeDoc.toDate = challenge.toDate;
        challengeDoc.state = challenge.state;
        return challengeDoc;
    }
}