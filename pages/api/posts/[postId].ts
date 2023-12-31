import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
    if(req.method !== 'GET' && req.method !== 'DELETE') {
        return res.status(405).end()
    }

    try {

        const { postId } = req.query

        if(!postId || typeof postId !== 'string') {
            throw new Error('Inavlid ID')
        }

        if(req.method === 'DELETE') {
          await prisma.post.delete({
            where: {
                id: postId
            }
        })
        }

        // including the user of the post and the post comments
        // the comments will include the user
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
          include: {
            user: true,
            comments: {
              include: {
                user: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        });

        return res.status(200).json(post)
        
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}
