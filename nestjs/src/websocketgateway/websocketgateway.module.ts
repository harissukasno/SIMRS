import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket';

@Module({
    providers: [WebsocketGateway],
    exports: [WebsocketGateway],
})
export class WebsocketgatewayModule {}
