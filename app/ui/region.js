import React from 'react';

export default function Region({region, setRegion}) {

    const handleRegion = (region) => {
        setRegion(region);

        return false;
    };

    const getRegion = (region) => {
        switch (region) {
            case 'en':
                return 'English';
            case 'ru':
                return 'Russian';
            case 'zh_CN':
                return 'Chinese';
            default:
                return 'Select Region';
        }
    };

    return (
        <div className="d-flex align-items-center">
            <label htmlFor="dropdownMenuButton" className="mb-0 me-2">Region:</label>
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                {getRegion(region)}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a className="dropdown-item" onClick={() => handleRegion('en')}>English (en)</a></li>
                    <li><a className="dropdown-item" onClick={() => handleRegion('ru')}>Russian (ru)</a></li>
                    <li><a className="dropdown-item" onClick={() => handleRegion('zh_CN')}>Chinese (zh_CN)</a></li>
                </ul>
            </div>
        </div>
    );
}
