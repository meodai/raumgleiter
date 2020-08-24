import axios from 'axios';
import fs from 'fs-extra';
import collect from 'collect.js';

export default async function (moduleOptions) {
  if (process.env.NODE_ENV === 'development' && ! process.env.CMS_URL) {

    console.log('Fetching Data from CMS...')
    await fs.emptyDir('./static/api');

    await axios.get(moduleOptions.baseUrl + '/categories.json')
    .then(data => data.data)
    .then(async (data) => {
      console.log('Writing categories.json');
      await fs.outputJson('./static/api/categories.json', data);
    });

    await axios.get(moduleOptions.baseUrl + '/projects.json')
    .then(data => data.data)
    .then(async (data) => {
      console.log('Writing projects.json');
      await fs.outputJson('./static/api/projects.json', data);

      collect(data.data).unique('slug').each(async project => {
        await axios.get(`${moduleOptions.baseUrl}/projects/${project.slug}.json`)
        .then(data => data.data)
        .then(async data => {
          console.log(`Writing ${project.slug}.json`)
          await fs.outputJson(`./static/api/projects/${project.slug}.json`, data);
        })
      });
    });
  }
}
