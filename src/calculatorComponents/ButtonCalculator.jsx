
// eslint-disable-next-line react/prop-types
export function ButtonCalculator({numerCalculator = '#', typeButton = 'NORMAL', iconButton = null, action = null}) {

    const typesButtons = {
        NORMAL: {
            buttonClass: 'btn-floating btn-large waves-effect black-text white',
            size: 'col s4'
        },
        HORIZONTAL_LARGE: {
            buttonClass: 'waves-effect waves-light btn black-text white black-text',
            size: 'col s8'
        },
        VERTICAL_LARGE: {
            buttonClass: 'waves-effect waves-purple btn black-text white vertical-large'
        },
        VERTICAL_LARGE_PRIMARY: {
            buttonClass: 'waves-effect waves-purple btn vertical-large'
        },

    };
    const selectedButton = typesButtons[typeButton];
    return (
        <>
            <div className={selectedButton.size}>
                <a className={selectedButton.buttonClass} onClick={action}>{iconButton ? iconButton : <b>{numerCalculator}</b>} </a>
            </div>
        </>
    )
}