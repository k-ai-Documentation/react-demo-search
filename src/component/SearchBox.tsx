import React, { useState } from 'react';
import styles from './SearchBox.module.scss';
import { KaiStudio } from 'kaistudio-sdk-js';
import SearchBar from './SearchBar';
import type { SearchResult } from 'kaistudio-sdk-js/modules/Search';

if (!import.meta.env.VITE_REACT_APP_ORGANIZATION_ID || !import.meta.env.VITE_REACT_APP_INSTANCE_ID || !import.meta.env.VITE_REACT_APP_API_KEY) {
    throw new Error('Missing required environment variables');
}

const sdk = new KaiStudio({
    organizationId: import.meta.env.VITE_REACT_APP_ORGANIZATION_ID,
    instanceId: import.meta.env.VITE_REACT_APP_INSTANCE_ID,
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
});

const SearchPage: React.FC = () => {
    const [searchInput, setValue] = useState<string>('');

    const [searchAnswer, setResults] = useState<SearchResult>();

    //used for loading simulate
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const fetchData = async (input: string) => {
        setLoading(true);
        setProgress(0);

        // simulate loading process
        const simulateProgress = () => {
            setProgress((currentProgress) => {
                if (currentProgress < 100) {
                    const nextProgress = currentProgress + Math.floor(Math.random() * 10 + 5);
                    return nextProgress > 100 ? 100 : nextProgress;
                }
                return currentProgress;
            });
        };

        const intervalId = setInterval(simulateProgress, 1500);

        try {
            if (input !== '') {
                //fetch data
                const searchResult = await sdk.search().query(input, '');
                setResults(searchResult);
                setProgress(100);
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        } catch (error) {
            console.error(error);
        } finally {
            clearInterval(intervalId);
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchData(searchInput);
    };

    const searchNewQuestion = (question: string) => {
        setValue(question);
        fetchData(question);
    };

    return (
        <div className={styles.searchBox}>
            <p className={'text-medium-16 text-white ' + styles.searchTitle}>Make a search</p>
            <p className={'text-regular-14 text-grey ' + styles.searchSubtitle}>Type your question and press Enter</p>
            <SearchBar searchInput={searchInput} setValue={setValue} handleSearch={handleSearch} />
            {searchAnswer && !searchAnswer.answer && <p className="no-answer text-white text-regular-14">No results. Please rephrase or ask another question.</p>}
            {loading && (
                <div className={styles.loading}>
                    <p className="text-regular-14 text-white">{progress < 100 ? `Loading ${progress}%` : 'Finishing...'}</p>
                </div>
            )}
            {searchAnswer && searchAnswer.answer && (
                <div className={styles.searchResult + ' text-regular-14'}>
                    {searchAnswer.answer !== '' && (
                        <div>
                            <p className={styles.answer + ' text-white text-regular-14'}>{searchAnswer.answer}</p>
                            <div className={styles.answerInformation}>
                                <div className={styles.answerBlock}>
                                    <p className={styles.subtitle + " text-regular-14 text-grey"}>Reason</p>
                                    <p className="text-white">{searchAnswer.reason}</p>
                                </div>
                                <div className={styles.answerBlock}>
                                    <p className={styles.subtitle + " text-regular-14 text-grey"}>Source</p>
                                    {searchAnswer.documents.length > 0 ? (
                                        searchAnswer.documents.map((source, index) => (
                                            <p className="text-white" key={index}>
                                                <a href={source.url} target="_blank">
                                                    {source.name}
                                                </a>
                                            </p>
                                        ))
                                    ) : (
                                        <p>No results found</p>
                                    )}
                                </div>
                                <div className={styles.answerBlock}>
                                    <p className={styles.subtitle + " text-regular-14 text-grey"}>Related-questions</p>
                                    {searchAnswer.followingQuestions.length > 0 ? (
                                        searchAnswer.followingQuestions.map((question, index) => (
                                            <p
                                                className={styles.clickable + " text-white"}
                                                key={index}
                                                onClick={() => {
                                                    searchNewQuestion(question);
                                                }}>
                                                {question}
                                            </p>
                                        ))
                                    ) : (
                                        <p>No results found</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
