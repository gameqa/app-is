// import { PrizeTypes, PrizeCategory} from "../../../../declerations";
import * as Colors from "../Colors";
import * as Statics from "../../static";

const PARTICIPATION_PRIZE = "Allir taka þátt";
const GANG_PRIZE = "Klíkan";
const THE_CHOSEN_ONES_PRIZE = "Útvaldir";
const INFLUENCER_PRIZE = "Áhrifavaldar";


export const mapToPrize = (type?: String) => {
    switch(type) {
        case PARTICIPATION_PRIZE:
            return Statics.ChestsImages.participationChestOpen;
        case GANG_PRIZE:
            return Statics.ChestsImages.gangChestOpen;
        case THE_CHOSEN_ONES_PRIZE:
            return Statics.ChestsImages.theChosenOnesChestOpen;
        case INFLUENCER_PRIZE:
            return Statics.ChestsImages.influencerChestOpen;
        default:
            return;
    }
}

export const mapToNoPrize = (type?: String) => {
    switch(type) {
        case PARTICIPATION_PRIZE:
            return Statics.ChestsImages.participationChest;
        case GANG_PRIZE:
            return Statics.ChestsImages.gangChest;
        case THE_CHOSEN_ONES_PRIZE:
            return Statics.ChestsImages.theChosenOnesChest;
        case INFLUENCER_PRIZE:
            return Statics.ChestsImages.influencerChest;
        default:
            return;
    }
} 

export const mapToColor = (type?: String) => {
    switch (type) {
        case PARTICIPATION_PRIZE:
            //green chest
            //mapToDark.highlight fer vel með fjólubláukistunni
            return Colors.MapToDark.green;
        case GANG_PRIZE:
            //blue chest
            return Colors.MapToDark.success;
        case THE_CHOSEN_ONES_PRIZE:
            //purple chest
            return Colors.MapToDark.highlight;
        case INFLUENCER_PRIZE:
            //red chest
            return Colors.MapToDark.danger;
        default:
            return;
    }
}