import React from 'react';
import styles from './SearchBar.module.scss';

type SearchBarProps = {
    searchInput: string;
    setValue: (value: string) => void;
    handleSearch: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchInput, setValue, handleSearch }) => {
    const [isClicked, setIsClicked] = React.useState(false);
    const clearInput = () => {
        setValue('');
    };
    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                className={styles.textbox}
                placeholder="Search for anything"
                value={searchInput}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
                onFocus={() => {
                    setIsClicked(true);
                }}
                onBlur={() => {
                    setIsClicked(false);
                }}
            />
            <img className={`${isClicked || searchInput ? styles.left : styles.right}`} src="/search.svg" alt="search" onClick={handleSearch} />
            {searchInput !== '' && <img className={styles.iconClose} src="/close-small.svg" alt="close" onClick={clearInput} />}
        </div>
    );
};

export default SearchBar;
