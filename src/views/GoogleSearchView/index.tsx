import React from 'react'
import { useSelector } from 'react-redux';
import {Molecules, Organisms } from "../../components";
import LayoutWrapper from "../../layout";
import { StoreState } from '../../reducers';

/**
 * This view is not a part of the game under the PLAY tab,
 * rather this view uses the Games.GoogleSearch in order
 * to allow the user to search for answers for his own
 * questions that have been marked as impossible
 * @returns JSX Element
 * 
 */
const GoogleSearchView = () => {

    const auth = useSelector((state: StoreState) => state.auth);
    
    return (
        <LayoutWrapper>
        <Molecules.Users.Info {...auth} />
            <Organisms.Game.GoogleSearch />
        </LayoutWrapper>
    )
}

export default GoogleSearchView
