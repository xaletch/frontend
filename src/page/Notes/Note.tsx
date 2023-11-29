import React, { useState } from 'react'
import { Menu } from '../../components/Notes/Menu/Menu';

export const Note = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState(false);

    return (
        <div>
            {/* <Menu setMenuOpen={setMenuOpen} menuOpen={menuOpen} isUpdate={isUpdate} setIsUpdate={setIsUpdate} /> */}
        </div>
    )
}
