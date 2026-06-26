import { createPosition } from './helper'

export const Status = {
    'ongoing' : 'Ongoing',
    'promoting' : 'Promoting',
    'white' : 'White wins',
    'black' : 'Black wins',
    'stalemate' : 'Game draws due to stalemate',
    'insufficient' : 'Game draws due to insufficient material',
}

// Maps dice face numbers (1-6) to piece type letters
export const DICE_TO_PIECE = {
    1: 'p',
    2: 'n',
    3: 'b',
    4: 'r',
    5: 'q',
    6: 'k',
}

export const initGameState = {
    position : [createPosition()],
    turn : 'w',
    candidateMoves : [],
    movesList : [],

    promotionSquare : null,
    status : Status.ongoing,
    castleDirection : {
        w : 'both',
        b : 'both'
    },
    diceValues : [],       // array of piece letters e.g. ['p','n','k']
    diceRolled : false,    // whether dice have been rolled this turn
}