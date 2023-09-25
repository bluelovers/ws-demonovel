//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="expect" />

import { basename, extname } from 'path';
import { newNovelUUID } from '../src/index';

beforeAll(async () =>
{

});

describe(basename(__filename, extname(__filename)), () =>
{

	test.skip(`dummy`, () => {});

	test(`test`, () =>
	{

		let actual = newNovelUUID('demonovel', 'user2/其實，我乃最強');
		expect(actual).toMatchSnapshot();

	});

})
