import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

const Inside = ({ provider }) => {
    useEffect(() => {
        const request = url => {
            provider.getAccessToken().then(token => {});
        };

        request();
    });
    return <div>Inside</div>;
};

Inside.propTypes = {};

export default Inside;
