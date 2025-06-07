import projects from '../public/data/projects.json';

export default function handler(req, res) {
  res
    .setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    .status(200)
    .json(projects);
}
