
import { NextRequest, NextResponse } from 'next/server'
const jwt = require('jsonwebtoken');

export function middleware( req,res) {
        try {
            const Authenticated = jwt.verify(req.cookies.Tokken,process.env.APP_SECRET_KEY);
            return NextResponse.next();
          } catch (error) {
            return NextResponse.redirect('/auth/login')
          }
}