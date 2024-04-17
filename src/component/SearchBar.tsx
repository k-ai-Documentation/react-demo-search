import React from 'react';
import styles from './SearchBar.module.scss';
import searchIcon from 'kai-assets/icons/search.svg'
import smallClose from 'kai-assets/icons/close-small.svg'
type SearchBarProps = {
    searchInput: string;
    setValue: (value: string) => void;
    handleSearch: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchInput, setValue, handleSearch }) => {
    const clearInput = () => {
        setValue('');
    };
    return (
        <div className={"search-bar "+styles.searchBar}>
            <input
                type="text"
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
            />
            <img className={styles.left+" icon-18"} src={searchIcon} alt="search" onClick={handleSearch} />
            {searchInput !== '' && <img className={styles.iconClose+" icon-18"} src={smallClose} alt="close" onClick={clearInput} />}
        </div>
    );
};

export default SearchBar;
