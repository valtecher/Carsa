import styled from "styled-components";



const SimpleCardStyled = styled.div<{ width?: string }>`
    background-color: #D8B669;
    width: ${props => props.width ?? '45%'};
    min-heght: 200px;
    height: auto;
    min-height:200px;
    margin: 10px;
    color: #fff;
    border-radius: 10px;
    padding: 10px;

    .header {
        font-size: 26px;
        font-weight: 700;
    }

    .actions{
        width: 180px;
        margin: 10px auto;
    }
`

interface SimpleCardProps {
    width?: string; 
    children?: any
}

const SimpleCard = (props:SimpleCardProps) => {
    return (
        <SimpleCardStyled width={props.width} >
            {props.children}
        </SimpleCardStyled>
    )
}

export default SimpleCard;