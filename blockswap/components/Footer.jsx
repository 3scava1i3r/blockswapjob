import styled from "styled-components"

function Footer() {
    return (
        <Foot classname="rpgui-content">
            <Div>
                <hr classname="golden" />
                <aLink href="">Contract</aLink>
            </Div>
            
        </Foot>
    );
}

const Foot = styled.div`
    display: flex; 
    align-items: center; 
    height: 8rem; 
`
const Div = styled.div`
    
    display: flex; 
    padding-left: 1.25rem;
    padding-right: 1.25rem; 
    justify-content: center; 
    align-items: center; 


`

const aLink = styled.a`
    
`

export default Footer;