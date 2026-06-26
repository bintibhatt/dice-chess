import { useAppContext }from '../../../contexts/Context'
import { copyPosition, getNewMoveNotation,  } from '../../../helper';
import { makeNewMove , clearCandidates } from '../../../reducer/actions/move';
import './PromotionBox.css'

const PromotionBox = ({onClosePopup}) => {

    const { appState , dispatch } = useAppContext();
    const {promotionSquare} = appState;

    if (!promotionSquare)
        return null

    const color = promotionSquare.x === 7 ? 'w' : 'b'
    const options = ['q','r','b','n']

    const getPromotionBoxPosition = () => {
        let style = {}

        if (promotionSquare.x === 7) {
            style.top = '-12.5%'
        }
        else{
            style.top = '97.5%'
        }

        if (promotionSquare.y <= 1){
            style.left = '0%'
        }
        else if (promotionSquare.y >= 5){
            style.right = '0%'
        }
        else {
            style.left = `${12.5*promotionSquare.y - 20}%`
        }

        return style
    }

    const onClick = option => {
        onClosePopup()
        const currentPosition = appState.position[appState.position.length - 1];
        const newPosition = copyPosition(currentPosition);

        // Clear the pawn's original square and place the promoted piece
        newPosition[promotionSquare.rank][promotionSquare.file] = "";
        newPosition[promotionSquare.x][promotionSquare.y] = color + option;

        const piece = color + "p";
        const newMove = getNewMoveNotation({
          piece,
          rank: promotionSquare.rank,
          file: promotionSquare.file,
          x: promotionSquare.x,
          y: promotionSquare.y,
          position: currentPosition,
          promotesTo: option,
        });
        dispatch(clearCandidates());
        dispatch(makeNewMove({ newPosition, newMove }));
    }

    return <div className="popup--inner promotion-choices" style={getPromotionBoxPosition()}>
        {options.map (option => 
            <div key={option}
                onClick = {() => onClick(option)} 
                className={`piece ${color}${option}`}
            />
        )}
    </div>

}

export default PromotionBox